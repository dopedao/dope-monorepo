import {
    Bytes,
    json,
    JSONValue,
    JSONValueKind
} from "@graphprotocol/graph-ts";
import { decode } from "as-base64"
import {
    Attribute,
	Hustler
} from "../../generated/schema";


export function getOrCreateHustler(id: string): Hustler {
    let hustler = Hustler.load(id);
	if (!hustler) {
		hustler = new Hustler(id);
		hustler.owner = "0x0000000000000000000000000000000000000000";
	}
    return hustler as Hustler
}

export function updateHustlerFromUri(id: string): Hustler {

    let hustler = getOrCreateHustler(id)

    if (hustler.data) {
        let hustlerData = hustler.data.split(",")
        if (hustlerData[0] == "data:application/json;base64") {
            let decoded = Bytes.fromUint8Array(decode(hustlerData[1]))
            let dataObj = json.fromBytes(decoded).toObject()
            hustler.name = (dataObj.get("name") as JSONValue).toString()
            hustler.image = (dataObj.get("image") as JSONValue).toString()
            let attributes = (dataObj.get("attributes") as JSONValue).toArray()
            for (let i = 0; i < attributes.length; i++) {
                let attributeObj = attributes[i].toObject()
                let traitType = (attributeObj.get("trait_type") as JSONValue).toString()
                let value = attributeObj.get("value") as JSONValue
                let traitValue = ""
                if (value.kind==JSONValueKind.STRING) {
                    traitValue = value.toString()
                } else if (value.kind==JSONValueKind.NUMBER) {
                    traitValue = value.toBigInt().toString()
                }
                let displayTypeValue = "None"
                let displayType = attributeObj.get("display_type")
                if (displayType != null) {
                    displayTypeValue = displayType.toString()
                }

                let attributeId = id + "-" + traitType
                let attribute = Attribute.load(attributeId)
                if (!attribute) {
                    attribute = new Attribute(attributeId)
                    attribute.hustler = id
                    attribute.traitType = traitType
                    attribute.displayType = displayTypeValue
                }
                attribute.value = traitValue
                attribute.save()
            }
        }
    }
    hustler.save()
    return hustler as Hustler
}

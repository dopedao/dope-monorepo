import Item from "game/inventory/Item";
import Inventory from "../../../inventory/Inventory";

interface InventoryProps
{
    inventory: Inventory;
    onItemClick: (item: Item) => void;
}

export default function InventoryComponent(props: InventoryProps)
{
    return (
        <>
        </>
    );
}
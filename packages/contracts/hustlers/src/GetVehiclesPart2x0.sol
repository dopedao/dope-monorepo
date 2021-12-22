
pragma solidity ^0.8.0;

contract GetVehiclesPart2x0 {
    function getRles() external returns (uint256[] memory, bytes[] memory) {
        uint256[] memory ids = new uint256[](2);
        uint256[2] memory _ids = [uint256(720898),uint256(851970)];
        for (uint256 i = 0; i < ids.length; i++) {
            ids[i] = _ids[i];
        }

        bytes[] memory rles = new bytes[](4);
        bytes[4] memory _rles = [bytes(hex'033b8767230b004701120009000201490206010a00070002015202020107000700010155020101060006000101040207030402070304020803040208030402090303020d0301020a0301010600060001010302010307040103020201030704010302020103080401030202010308040103020201030105050402050104010302020103010501060107010801090108010a0208010b0109010301020308010c010a0208010b0109010301020600050001010402010307040103020201030704010302020103080401030202010308040103020201030105050402050104010302020103010501060107010801090108010a0208010b0109010301020308010c010a0208010b020901030101050005000101030201030804010302020103070401030202010308040103020201030804010302020103010505040205020401030202010301050106010801090108010a0208010b0209010301020308010c010a0208010b01090103010105000500010103020103080401030202010307040103020201030804010302020103080401030202010301040105050402050104010302020103010501060107010801090108010a0208010b0109010301020308010c010a0208010b010901030101050005000101030201030804010302020103070401030202010308040103020201030804010302020103010401050504020501040103010d01020103010501060107010801090108010a0208010b010d010301020308010c010a0208010b0109010d010301010200010d01000500010103020103080401030202010307040103020201030804010302020103080401030202010301040105050402050104030d0103010501060107010801090108010a0208010d0109010301020408010c010a0208010d0109010301010100030d050001010302010308040103020201030704010302020103080401030202010308040103020201030204010505040205010d010e010d01020103010501060107010801090108010a010d0108010b0109010301020308010c010a0108010d010b0109010301010100010d010e010d050001010302010308040103020201030704010302020103080401030202010308040103020201030204010505040205010d010e010d010201030609010d0409010301020509010d040901030101010d010e010d050001010402080304020703040208030402080304020a03020d010e01020603010d060301020403010d06030101010e020d040001013f02010d010e1a020101010e010d01000400330f01100d0f010e010f1a02010e020004000101400201110210010f170201100111020004000112321301140f130202020f1402010f01020101020003000112331301140f13011401130202020f080203150602010f010201130112020003000112331301140f13011403130202010f0602011501110115011101150402010f010202130112020003000112021305162c1301140f13011405130102010f0402021501110115011102150202010f010203130112020003000112331301140f1301140117011804130102010f030201150111011501110115011101150202010f01020213011701180200030001120213051601130514261301140f1301140117011805130102010f020201150111011501110115011101150102010f010203130117011802000300011208130514261301140f13011408130102010f0202011501110115011101150202010f0102041301120200030001120213051601130514261301140f1301140313020f04130102010f020203150202010f01020213020f0113011202000300011234130914061301140213010f0211010f04130102010f0602010f01020113010f0211010f0112020003000112021305162e1308190114051301140113010f0411010f04130102010f0402010f01020113010f0411011202000300011234130119081a01190114041301140113010f0411010f04130102010f0402010f01020113010f04110112020003000112021305162c130119021a061b021a01190114031301140213010f0211010f06130102010f0202010f01020313010f0211010f011202000300011232130119021a081b021a01190114021301140313020f07130102010f0202010f01020413020f01130112020002000102011209130b191e130119011a021b011c031d011c031b011a01190114021301140613011e06130102020f01020613011e011301120200010001020100011208130119011a021b011f0320011d011c021b01191d13011a031b011f0320011d011c021b021a0113021402130502011e1002011e03020100010001020100011201190113011901130119011301190113011a021b011f022001210220011d031b01130119011301190113011901130119011301190113011901130119011301190113011901130119011301190113011901130119011301190113011a021b011f022001210220011d031b011a011901130119011301020514011e071402220714011e021401000102010001020100011901130119011301190113011901130119011a011b011f0220012102230220011d021b01190113011901130119011301190113011901130119011301190113011901130119011301190113011901130119011301190113011901130119011a011b011f0220012102230220011d021b011a01130119021301020513011e071302020713011e0213010001020c02011a011b011f0120012104230120011d021b011a011901130119170201190113011a011b011f0120012104230120011d021b011a01190902011e1002011e04020c02011a011b011f0120012104230120011d021b031a17020119031a011b011f0120012104230120011d021b011a0a02011e1002011e04020400091a011b011f0120022103230120011d021b1e1a011b011f0120022103230120011d021b011a1f2401000d00011b011f02200221012301200125011d021b1e1a011b011f02200221012301200125011d021b0b1a011e0a1a0326021a0100011e04000d00021b011f0220012101200225011d021b1e1a021b011f0220012101200225011d021b081a03000b1a032608000d00021b011c011f0420011d021b041a0100091a03260f00011b011c011f0420011d021b041a0900091a032609000e00021b011c041f031b031a0200091a03260f00021b011c041f031b031a0a00091a0326090001000e27081b041a0327071a03261127081b041a0b27071a0326072703001027061b041a0527051a03261327061b041a0d27051a03260927020002005e270400'),hex'033b8767230b004701120009000201490206010a00070002015202020107000700010155020101060006000101040207030402070304020803040208030402090303020d0301020a0301010600060001010302010307040103020201030704010302020103080401030202010308040103020201030105050402050104010302020103010501060107010801090108010a0208010b0109010301020308010c010a0208010b0109010301020600050001010402010307040103020201030704010302020103080401030202010308040103020201030105050402050104010302020103010501060107010801090108010a0208010b0109010301020308010c010a0208010b020901030101050005000101030201030804010302020103070401030202010308040103020201030804010302020103010505040205020401030202010301050106010801090108010a0208010b0209010301020308010c010a0208010b01090103010105000500010103020103080401030202010307040103020201030804010302020103080401030202010301040105050402050104010302020103010501060107010801090108010a0208010b0109010301020308010c010a0208010b010901030101050005000101030201030804010302020103070401030202010308040103020201030804010302020103010401050504020501040103010d01020103010501060107010801090108010a0208010b010d010301020308010c010a0208010b0109010d010301010200010d01000500010103020103080401030202010307040103020201030804010302020103080401030202010301040105050402050104030d0103010501060107010801090108010a0208010d0109010301020408010c010a0208010d0109010301010100030d050001010302010308040103020201030704010302020103080401030202010308040103020201030204010505040205010d010e010d01020103010501060107010801090108010a010d0108010b0109010301020308010c010a0108010d010b0109010301010100010d010e010d050001010302010308040103020201030704010302020103080401030202010308040103020201030204010505040205010d010e010d010201030609010d0409010301020509010d040901030101010d010e010d050001010402080304020703040208030402080304020a03020d010e01020603010d060301020403010d06030101010e020d040001013f02010d010e1a020101010e010d01000400330f01100d0f010e010f1a02010e020004000101400201110210010f170201100111020004000112321301140f130202020f1402010f01020101020003000112331301140f13011401130202020f080203150602010f010201130112020003000112331301140f13011403130202010f0602011501110115011101150402010f010202130112020003000112021305162c1301140f13011405130102010f0402021501110115011102150202010f010203130112020003000112331301140f1301140117011804130102010f030201150111011501110115011101150202010f01020213011701180200030001120213051601130514261301140f1301140117011805130102010f020201150111011501110115011101150102010f010203130117011802000300011208130514261301140f13011408130102010f0202011501110115011101150202010f0102041301120200030001120213051601130514261301140f1301140313020f04130102010f020203150202010f01020213020f0113011202000300011234130914061301140213010f0211010f04130102010f0602010f01020113010f0211010f0112020003000112021305162e1308190114051301140113010f0411010f04130102010f0402010f01020113010f0411011202000300011234130119081a01190114041301140113010f0411010f04130102010f0402010f01020113010f04110112020003000112021305162c130119021a061b021a01190114031301140213010f0211010f06130102010f0202010f01020313010f0211010f011202000300011232130119021a081b021a01190114021301140313020f07130102010f0202010f01020413020f01130112020002000102011209130b191e130119011a021b011c031d011c031b011a01190114021301140613011e06130102020f01020613011e011301120200010001020100011208130119011a021b011f0320011d011c021b01191d13011a031b011f0320011d011c021b021a0113021402130502011e1002011e03020100010001020100011201190113011901130119011301190113011a021b011f022001210220011d031b01130119011301190113011901130119011301190113011901130119011301190113011901130119011301190113011901130119011301190113011a021b011f022001210220011d031b011a011901130119011301020514011e071402220714011e021401000102010001020100011901130119011301190113011901130119011a011b011f0220012102230220011d021b01190113011901130119011301190113011901130119011301190113011901130119011301190113011901130119011301190113011901130119011a011b011f0220012102230220011d021b011a01130119021301020513011e071302020713011e0213010001020c02011a011b011f0120012104230120011d021b011a011901130119170201190113011a011b011f0120012104230120011d021b011a01190902011e1002011e04020c02011a011b011f0120012104230120011d021b031a17020119031a011b011f0120012104230120011d021b011a0a02011e1002011e04020400091a011b011f0120022103230120011d021b1e1a011b011f0120022103230120011d021b011a1f2401000d00011b011f02200221012301200125011d021b1e1a011b011f02200221012301200125011d021b0b1a011e0a1a0326021a0100011e04000d00021b011f0220012101200225011d021b1e1a021b011f0220012101200225011d021b081a03000b1a032608000d00021b011c011f0420011d021b041a0100091a03260f00011b011c011f0420011d021b041a0900091a032609000e00021b011c041f031b031a0200091a03260f00021b011c041f031b031a0a00091a0326090001000e27081b041a0327071a03261127081b041a0b27071a0326072703001027061b041a0527051a03261327061b041a0d27051a03260927020002005e270400',bytes(hex'03458467261600012824292300140002281329142a0129200012000228022b042c0229012a022c062d022c0129012a012e012f01300331023006310132013302310134012e012a02291e0011000128032b052c0129012a032c062d032c0129012a012e012f01300331023006310132013302310234012e012a01291d0010000128032b062c0129012a042c062d022c0129012a022e012f01300331023006310132013302310234012e012a01291c000f000128032b072c0129012a042c062d032c0129012a012e022f01300331023006310132013302310234012e012a02291a00050009350128032b082c0129012a042c072d022c0229012a012e022f01300331023006310132013302310234012e022a01291900040008350228032b082c0129012a052c072d032c0229012a012e022f01300331023006310132013302310234022e012a012918000400022805000128042b092c0129012a052c062d0228022b0229012a022e022f01300331023006310132013302310234022e012a0229160003000328013503000128042b0a2c0129012a062c062d0228012b012c0229012a022e022f0130033102300631012e013302310234032e012a012915000300032802350100052b0b2c0129012a062c082d0128012b1f29140003001729012a1029022812360329073607370e0002001728012a1228012a08280d36052905360138013902360537090002001728012a1228012a0d280d36032902360139013807360537040002001629012a0229032b01280d29012a102903360d35023a0135023a093503000100013b1628012a0228032901360d28012a1128013601350126013c013d0135013c013d01350526013a0235013a0235013a0226013c013d0135013c013d0135013e02000100013f092b0428092b012a132b012a052b0628012b052801360135013c013d0240013d02400135014101420226013a0235013a0235013a0126013c013d0240013d0240013e02000100013f082b012804350128082b012a132b012a042b0128061a0128012b042801360135013c013d0240013d024001350126014101420126013a0235013a0235013a0126013c013d0240013d0240013e02000200072b01280135041b011a0128072b012a132b012a032b0128011a061b011a0128012b0328013601350126013c013d0135013c013d01350626023a0126023a0326013c013d0135013c013d0135013e02000200062b01280135061b011a0128062b012a132b012a022b0128011a081b011a042802361b3e023501000100072901280135011b0243011c031b01350128052b012a132b012a012b01280135021b011c0343011c031b013501280f350a3a08350100010007440135011b014301450243011c021b011a0128052b012a132b012a01280135021b011c01430145014301450143011c021b0135054101440146013503470135034601350a3a0135034601350247013501000100062b01280135011b01430120014301200143031b01350128042b012a132b012a01280135011b011c014301450148014302200143011c011b013501280735034705350a3a05350247013501000100062b0128013501430145014302200243021b01350128042b012a132b012a01280135011b014301450143011a01430120014301200143011b013501280135013e1d35013e02000300042b01280135014301450220014301200143021b011a0128052b012a122b012a01280135011b01430145012001430125014302200143011b0135012802351d3e013502000300042b0128013502430120014301200243021b011a01281a290135011b03430120014301250343021b013501281f3502000700021b01430145014303200143021b011a013501290135012801290135012a0129013501280129013501280129013501280129013501280129013501280129013501280129012a0128011b014301450120014301200143012501200143021b01350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128013502000700021b02430220014301250143021b021a013501280129013501280129012a012801290135012801290135012801290135012801290135012801290135012801290135012a0129011b014301450143012001430120014301250143021b011a01290135012801290135012801290135012801290135012801290135012801290135012801290135012801290135012801290135012801290135012801350128013501000700021b014301450120014301200243021b031a0c000a1a02260100031b014301450120014302200243021b031a0b000c1a032606000800021b01430145014301200143031b031a0c000a1a02260200021b011c01430145014302200143021b031a0d000a1a032607000800031b0343031b031a0e00081a02260300031b011c0443031b031a0d000a1a0326070001000827071b031a1027061a02260527091b031a0f27081a0326072701000a27041b041a1227041a02260727071b031a1127061a03260927030058270300'),hex'03458467261600012824292300140002281329142a0129200012000228022b042c0229012a022c062d022c0129012a012e012f01300331023006310132013302310134012e012a02291e0011000128032b052c0129012a032c062d032c0129012a012e012f01300331023006310132013302310234012e012a01291d0010000128032b062c0129012a042c062d022c0129012a022e012f01300331023006310132013302310234012e012a01291c000f000128032b072c0129012a042c062d032c0129012a012e022f01300331023006310132013302310234012e012a02291a00050009350128032b082c0129012a042c072d022c0229012a012e022f01300331023006310132013302310234012e022a01291900040008350228032b082c0129012a052c072d032c0229012a012e022f01300331023006310132013302310234022e012a012918000400022805000128042b092c0129012a052c062d0228022b0229012a022e022f01300331023006310132013302310234022e012a0229160003000328013503000128042b0a2c0129012a062c062d0228012b012c0229012a022e022f0130033102300631012e013302310234032e012a012915000300032802350100052b0b2c0129012a062c082d0128012b1f29140003001729012a1029022812360329073607370e0002001728012a1228012a08280d36052905360138013902360537090002001728012a1228012a0d280d36032902360139013807360537040002001629012a0229032b01280d29012a102903360d35023a0135023a093503000100013b1628012a0228032901360d28012a1128013601350126013c013d0135013c013d01350526013a0235013a0235013a0226013c013d0135013c013d0135013e02000100013f092b0428092b012a132b012a052b0628012b052801360135013c013d0240013d02400135014101420226013a0235013a0235013a0126013c013d0240013d0240013e02000100013f082b012804350128082b012a132b012a042b0128061a0128012b042801360135013c013d0240013d024001350126014101420126013a0235013a0235013a0126013c013d0240013d0240013e02000200072b01280135041b011a0128072b012a132b012a032b0128011a061b011a0128012b0328013601350126013c013d0135013c013d01350626023a0126023a0326013c013d0135013c013d0135013e02000200062b01280135061b011a0128062b012a132b012a022b0128011a081b011a042802361b3e023501000100072901280135011b0243011c031b01350128052b012a132b012a012b01280135021b011c0343011c031b013501280f350a3a08350100010007440135011b014301450243011c021b011a0128052b012a132b012a01280135021b011c01430145014301450143011c021b0135054101440146013503470135034601350a3a0135034601350247013501000100062b01280135011b01430120014301200143031b01350128042b012a132b012a01280135011b011c014301450148014302200143011c011b013501280735034705350a3a05350247013501000100062b0128013501430145014302200243021b01350128042b012a132b012a01280135011b014301450143011a01430120014301200143011b013501280135013e1d35013e02000300042b01280135014301450220014301200143021b011a0128052b012a122b012a01280135011b01430145012001430125014302200143011b0135012802351d3e013502000300042b0128013502430120014301200243021b011a01281a290135011b03430120014301250343021b013501281f3502000700021b01430145014303200143021b011a013501290135012801290135012a0129013501280129013501280129013501280129013501280129013501280129013501280129012a0128011b014301450120014301200143012501200143021b01350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128012901350128013502000700021b02430220014301250143021b021a013501280129013501280129012a012801290135012801290135012801290135012801290135012801290135012801290135012a0129011b014301450143012001430120014301250143021b011a01290135012801290135012801290135012801290135012801290135012801290135012801290135012801290135012801290135012801290135012801350128013501000700021b014301450120014301200243021b031a0c000a1a02260100031b014301450120014302200243021b031a0b000c1a032606000800021b01430145014301200143031b031a0c000a1a02260200021b011c01430145014302200143021b031a0d000a1a032607000800031b0343031b031a0e00081a02260300031b011c0443031b031a0d000a1a0326070001000827071b031a1027061a02260527091b031a0f27081a0326072701000a27041b041a1227041a02260727071b031a1127061a03260927030058270300'];
        for (uint256 i = 0; i < rles.length; i++) {
            rles[i] = _rles[i];
        }

        return (ids, rles);
    }
}

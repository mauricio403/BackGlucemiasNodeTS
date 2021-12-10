"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.storeRow = void 0;
const SpreadSheetContainer_1 = require("../models/googleSpreadSheet/SpreadSheetContainer");
const storeRow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sheetTitle = req.body.sheetTitle;
        const row = req.body.row;
        const month = req.body.month;
        const container = SpreadSheetContainer_1.SpreadSheetContainer.getInstance();
        const doc = container.docs[month];
        const sheets = doc.sheetsByIndex;
        const sheet = searchBySheetTitle(sheets, sheetTitle);
        const newRow = yield sheet.addRow(row);
        return res.json({
            data: 'ok',
            msg: 'Row added'
        });
    }
    catch (error) {
        return res.json({
            data: 'Algo salió mal',
            msg: error
        });
    }
});
exports.storeRow = storeRow;
function readRow(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) {
        }
    });
}
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const container = SpreadSheetContainer_1.SpreadSheetContainer.getInstance();
    const doc = container.docs.december;
    const sheets = doc.sheetsByIndex;
    const sheet = searchBySheetTitle(sheets, 'Bryan');
    console.log(sheet);
    yield sheet.addRow({
        nombre: 'Bryan',
        edad: 121
    });
    return res.json('ok');
});
exports.test = test;
const searchBySheetTitle = (spreadSheets, title) => {
    for (const sheet of spreadSheets) {
        if (sheet._rawProperties.title == title) {
            return sheet;
        }
    }
};
//# sourceMappingURL=sheetsController.js.map
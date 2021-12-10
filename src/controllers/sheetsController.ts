import { Request, Response } from "express";
import { SpreadSheetContainer } from "../models/googleSpreadSheet/SpreadSheetContainer";
import { DocumentContainer } from "../models/googleSpreadSheet/SpreadSheetContainer";

export const storeRow = async (req: Request, res: Response) => {
    try {
        const sheetTitle: string = req.body.sheetTitle;
        const row = req.body.row;
        const month: keyof DocumentContainer = req.body.month;

        const container = SpreadSheetContainer.getInstance();

        const doc = container.docs[month];

        const sheets = doc.sheetsByIndex;

        const sheet = searchBySheetTitle(sheets, sheetTitle);

        const newRow = await sheet.addRow(row);

        return res.json({
            data: 'ok',
            msg: 'Row added'
        });

    } catch (error) {
        return res.json({
            data: 'Algo salió mal',
            msg: error
        });
    }


}
async function readRow(req: Request, res: Response) {
    try {

    } catch (error) {

    }
}
export const test = async (req: Request, res: Response) => {

    const container = SpreadSheetContainer.getInstance();

    const doc = container.docs.december;

    const sheets = doc.sheetsByIndex;

    const sheet = searchBySheetTitle(sheets, 'Bryan');

    console.log(sheet);

    await sheet.addRow({
        nombre: 'Bryan',
        edad: 121
    });

    return res.json('ok');
}
const searchBySheetTitle = (spreadSheets: any[], title: string) => {
    for (const sheet of spreadSheets) {
        if (sheet._rawProperties.title == title) {
            return sheet;
        }
    }
}
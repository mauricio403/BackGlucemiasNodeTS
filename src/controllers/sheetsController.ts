import { Request, Response } from "express";
import { SpreadSheetContainer } from "../models/googleSpreadSheet/SpreadSheetContainer";
import { DocumentContainer } from "../models/googleSpreadSheet/SpreadSheetContainer";

export const storeRow = async (req: Request, res: Response) => {
    try {
        const sheetTitle: string = req.body.sheetTitle;
        const row = req.body.row;
        const month: keyof DocumentContainer = req.body.month;

        const container = SpreadSheetContainer.getInstance();
        console.log('2', container);

        const doc = container.docs[month];
        console.log('3', doc.title);

        const sheet = doc.sheetsByIndex[0];
        console.log('4');

        const { fecha, ayuno } = row;
        const newRow = await sheet.addRow({
            fecha,
            ayuno
        });
        // console.log('5', newRow);

        return res.json({
            data: newRow,
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

    const container = SpreadSheetContainer.getInstance().docs;
    const number = Object.keys(container).length
    console.log(number);

    return res.json(number);
}
const searchBySheetTitle = (spreadSheet: any, title: any) => {
    for (const sheet of spreadSheet) {
        if (sheet._rawProperties.title == title) {
            return sheet;
        }
    }
}
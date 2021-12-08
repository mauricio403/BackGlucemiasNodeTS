const { GoogleSpreadsheet } = require('google-spreadsheet');

export class SpreadSheetContainer {
    private static instance: SpreadSheetContainer;
    public docs: SpreadSheet[] = [];
    private constructor() {
    }

    async newDoc(spreadSheetid: string) {
        try {
            if (validateNumberOfDocuments(this.docs)) {

                const doc = await new GoogleSpreadsheet(spreadSheetid);
                await doc.useServiceAccountAuth({
                    client_email: 'bryan-691@aerobic-guide-333820.iam.gserviceaccount.com',
                    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCbSHEVz/d3eUTp\nWeegpjrEy2pqeK9B5C9Cuz6p/zr/MgkUZ4S3fVuj/vHDmwkGSkR3dUy/EXxyu+e8\nII3lrm9Jk7AUQB59gcxFD81C+9kJbzsXu2d4QVtPg6k3QN0siQLxgPlJElNFcM3j\njLt1547ammhyC4DArtf38VaXlRrsaDhMyx8jnThDhPASXRre9wUmPqRrjfuVtbD7\ngmDPk8HEkq7OwjPAJ5sWyqE6uLI2KOVD6kL2IOhDd+0a7P1LNW/rWgSrqneIniwt\noffTWWmP3YPKf7uCAQx9V95qx2zirBwGxb7mSeLmdn2k/jruZYMozDcyRWTYH0ga\nYoF+tjm7AgMBAAECggEAE4azeauyEZr1OGauwrvEbhSqKANO/nkkHD8RbS0EDS0M\niT1PKgega2nWmuM26kySeXcNlIUtYfwQ8s4hKb2ajuT8Yj+B1gRpXFHVXNPwgcgz\n5RMSusN1KPWEZMdKSJxd+2JddnvQbs31heSfef8JLqH1+klKAnC6BZqaaes8/HcY\nU/A4VfXL8+ca/se+Yu1xHMyQirf4rg+pFeafFjX2rvTa0l43FvbDBlT7qr9f42jw\nl90BTd30QuV9W+NnqvyFFf+aju1987uDWykBAhRZ1n5pFw3Y/817XdjPTfHzE5t/\n58DWFTWS2lSKDkmUCLVdtvmfa6qw4xkPh1UGPCQRIQKBgQDQcaqoC3zEfA7jefWs\npxukuP6FuCmQfqvCi3aeDd1Ax3gK4S/f6PU3MNx4Ese6C7f1E3Ccem+ZbTXADx5r\nI/cpr+rnSRrYSg5AsYMKHTzwnpEurprxY8LennnbT/ZafvGBdrbTzQZgdD7wfPm3\nv1hOIG7NOqvHEqWg6qqjYu7qUQKBgQC+td0j/e9/cAN81XQJlJbBLynGMKh/p0pS\nqhU8WN6kX4+Spj8/ZRJVE9+/PEl7iv53cu8ZTObjw2kHgkMTTljk5Fb16r6wIuaO\nHbSfJb6pQJD3V8Gfijz2YTUEqmMydinEPjZQFkLa83aBqv7hPL0MY96Y/UgGRyOG\nD00VFkVUSwKBgQCwE1RVH18FmsX44czlS0POoXZe/nId3OK6M5S/bna3gcelaRNH\n0UFSnbOeuj58qel63DED/WjH8bi1xA+t8XOXg0KqnNZQXj4r58cJhCk2GLwK8vNv\ndRXnd3b4C1POnezjr6RAxa/dSlTgULGgxcGSPVNbiXQRdW7zv0blPW0UAQKBgQCc\n7PsdzatQGrTT+LR12a2/Ivbl3U4ZVGfE4617rcjuSq/SRTgQCzPti9/19T6mCPZh\nBdMW53+p9TasdhSJg1OEbRvdWR81wlIiqPDib+WWUcm3rZ9mjxKgzdYZk7byY+b0\nUxjQB7FVhzaBdloqrpcE5fzZuLiWad0iR97uthewRwKBgQC1H9LuxRJnqZxrH5oL\nzEU2ZEsOi8oQ7wwJ20aAi3KtZvIcQuMqUECLHBQnhjcbLAZ3MSoMD0EC7IC53Ri9\ndFZJcKpULJf06RXtJf8J4D8/ak3GZFaAegMwj0R5bgJlKHfP1eCHWjih3uasYE1w\nYXnfRGi2ozmaQvTADJqI6cE9Hw==\n-----END PRIVATE KEY-----\n',
                });
                await doc.loadInfo();
                this.docs.push(doc);

                return doc;
            }
            throw new Error("No se inicializó el documento");


        } catch (error: any) {
            return error;
        }
    }

    public static getInstance(): SpreadSheetContainer {
        if (!SpreadSheetContainer.instance) {
            SpreadSheetContainer.instance = new SpreadSheetContainer();
            return SpreadSheetContainer.instance;
        }

        return SpreadSheetContainer.instance;
    }

}

// export class SpreadSheet {
//     docs: Document[] = [];

//     constructor(spreadSheetid: string) {
//         this.init(spreadSheetid);
//     }

// async init(spreadSheetid: string) {
// try {
//     if (validateNumberOfDocuments(this.docs)) {

//         const doc = await new GoogleSpreadsheet(spreadSheetid);
//         doc.useServiceAccountAuth({
//             client_email: 'bryan-691@aerobic-guide-333820.iam.gserviceaccount.com',
//             private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCbSHEVz/d3eUTp\nWeegpjrEy2pqeK9B5C9Cuz6p/zr/MgkUZ4S3fVuj/vHDmwkGSkR3dUy/EXxyu+e8\nII3lrm9Jk7AUQB59gcxFD81C+9kJbzsXu2d4QVtPg6k3QN0siQLxgPlJElNFcM3j\njLt1547ammhyC4DArtf38VaXlRrsaDhMyx8jnThDhPASXRre9wUmPqRrjfuVtbD7\ngmDPk8HEkq7OwjPAJ5sWyqE6uLI2KOVD6kL2IOhDd+0a7P1LNW/rWgSrqneIniwt\noffTWWmP3YPKf7uCAQx9V95qx2zirBwGxb7mSeLmdn2k/jruZYMozDcyRWTYH0ga\nYoF+tjm7AgMBAAECggEAE4azeauyEZr1OGauwrvEbhSqKANO/nkkHD8RbS0EDS0M\niT1PKgega2nWmuM26kySeXcNlIUtYfwQ8s4hKb2ajuT8Yj+B1gRpXFHVXNPwgcgz\n5RMSusN1KPWEZMdKSJxd+2JddnvQbs31heSfef8JLqH1+klKAnC6BZqaaes8/HcY\nU/A4VfXL8+ca/se+Yu1xHMyQirf4rg+pFeafFjX2rvTa0l43FvbDBlT7qr9f42jw\nl90BTd30QuV9W+NnqvyFFf+aju1987uDWykBAhRZ1n5pFw3Y/817XdjPTfHzE5t/\n58DWFTWS2lSKDkmUCLVdtvmfa6qw4xkPh1UGPCQRIQKBgQDQcaqoC3zEfA7jefWs\npxukuP6FuCmQfqvCi3aeDd1Ax3gK4S/f6PU3MNx4Ese6C7f1E3Ccem+ZbTXADx5r\nI/cpr+rnSRrYSg5AsYMKHTzwnpEurprxY8LennnbT/ZafvGBdrbTzQZgdD7wfPm3\nv1hOIG7NOqvHEqWg6qqjYu7qUQKBgQC+td0j/e9/cAN81XQJlJbBLynGMKh/p0pS\nqhU8WN6kX4+Spj8/ZRJVE9+/PEl7iv53cu8ZTObjw2kHgkMTTljk5Fb16r6wIuaO\nHbSfJb6pQJD3V8Gfijz2YTUEqmMydinEPjZQFkLa83aBqv7hPL0MY96Y/UgGRyOG\nD00VFkVUSwKBgQCwE1RVH18FmsX44czlS0POoXZe/nId3OK6M5S/bna3gcelaRNH\n0UFSnbOeuj58qel63DED/WjH8bi1xA+t8XOXg0KqnNZQXj4r58cJhCk2GLwK8vNv\ndRXnd3b4C1POnezjr6RAxa/dSlTgULGgxcGSPVNbiXQRdW7zv0blPW0UAQKBgQCc\n7PsdzatQGrTT+LR12a2/Ivbl3U4ZVGfE4617rcjuSq/SRTgQCzPti9/19T6mCPZh\nBdMW53+p9TasdhSJg1OEbRvdWR81wlIiqPDib+WWUcm3rZ9mjxKgzdYZk7byY+b0\nUxjQB7FVhzaBdloqrpcE5fzZuLiWad0iR97uthewRwKBgQC1H9LuxRJnqZxrH5oL\nzEU2ZEsOi8oQ7wwJ20aAi3KtZvIcQuMqUECLHBQnhjcbLAZ3MSoMD0EC7IC53Ri9\ndFZJcKpULJf06RXtJf8J4D8/ak3GZFaAegMwj0R5bgJlKHfP1eCHWjih3uasYE1w\nYXnfRGi2ozmaQvTADJqI6cE9Hw==\n-----END PRIVATE KEY-----\n',
//         });
//         doc.loadInfo();
//         this.docs.push(doc);
//     }
//     throw new Error("No se inicializó el documento");


// } catch (error) {
//     return error;
// }
// }


// }

interface SpreadSheet {
    title?: string;
}

const validateNumberOfDocuments = (docs: SpreadSheet[]): boolean => {
    return docs.length <= 12;
}
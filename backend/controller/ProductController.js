var express = require('express');
var router = express.Router();

var sql2 = require("mssql/msnodesqlv8");
var conns = require("../connection/connect")();

var routes = function() {

    router.post('/', function(req, res, next) {
        sql2.connect(conns, function(err) {
            if (err) {
                console.log(err);
            } else {
                let body = req.body;
                console.log(body);
                var request = new sql2.Request();

                var strSql = "select  [Store No_] as storeNo, [Item No_] AS itemNo, [Item Description] as itemName, [Barcode No_] as barcode, Format([Normal Price include VAT], 'N', 'en-US') as nomalPrice, Format([Red Flag Price],'N', 'en-US') as redFlagPrice from [QMART-GOLIVE$Active Sales Price] with (nolock) where 1 = 1";
                if (body.barcode) {
                    strSql += " and [Barcode No_]= @barcode ";
                    request.input('barcode', sql2.NVarChar(50), body.barcode);
                }
                if (body.store) {
                    strSql += " and [Store No_] IN ('ALL', @store) ";
                    request.input('store', sql2.NVarChar(50), body.store);
                }

                request.query(strSql, function(err, result) {

                    if (err) {
                        console.log(err);
                        res.sendStatus(500, err);
                    } else {
                        var rowsCount = result.rowsAffected;
                        console.log('rowsCount:' + rowsCount);
                        console.log('data:' + result.recordsets[0]);
                        res.status(200).json(result.recordsets[0]);
                    }
                    sql2.close();
                }); // request.query
            }
        }); // sql.conn}
    }); // get /

    router.post('/salePriceLog', function(req, res, next) {
        sql2.connect(conns, function(err) {
            if (err) {
                console.log(err);
            } else {
                let body = req.body;
                console.log(body);
                var request = new sql2.Request();

                var strSql = "";
                strSql += " INSERT INTO [dbo].[Qmart RP CheckSalePrice Log]	";
                strSql += "            (							        ";
                strSql += "             [StoreNo]							";
                strSql += "            ,[ItemNo]							";
                strSql += "            ,[ItemName]							";
                strSql += "            ,[Barcode]							";
                strSql += "            ,[NomalPrice]						";
                strSql += "            ,[RedFlagPrice]						";
                strSql += "            ,[StorePrice]						";
                strSql += "            ,[PostingDate]						";
                strSql += "            ,[Inspector]						    ";
                strSql += "            )					               	";
                strSql += "      VALUES (			                        ";
                strSql += "             @StoreNo				     		";
                strSql += "            ,@ItemNo				                ";
                strSql += "            ,@ItemName			                ";
                strSql += "            ,@Barcode			                ";
                strSql += "            ,@NomalPrice		                    ";
                strSql += "            ,@RedFlagPrice		                ";
                strSql += "            ,@StorePrice		                    ";
                strSql += "            ,@PostingDate			            ";
                strSql += "            ,@Inspector			                ";
                strSql += "            )			                        ";

                request.input('StoreNo', sql2.NVarChar(20), body.storeNo || null);
                request.input('ItemNo', sql2.NVarChar(20), body.itemNo || null);
                request.input('ItemName', sql2.NVarChar(50), body.itemName || null);
                request.input('Barcode', sql2.NVarChar(30), body.barcode || null);
                request.input('NomalPrice', sql2.Decimal(30, 20), body.nomalPrice || null);
                request.input('RedFlagPrice', sql2.Decimal(30, 20), body.redFlagPrice || null);
                request.input('StorePrice', sql2.Decimal(30, 20), body.storePrice || null);
                request.input('PostingDate', sql2.DateTime(), body.postingDate || null);
                request.input('Inspector', sql2.NVarChar(50), body.inspector || null);

                request.query(strSql, function(err, result) {

                    if (err) {
                        console.log(err);
                        res.sendStatus(500, err);
                    } else {
                        var rowsCount = result.rowsAffected;
                        console.log('rowsCount:' + rowsCount);
                        res.status(200).json(rowsCount);
                    }
                    sql2.close();
                }); // request.query
            }
        }); // sql.conn
    }); // post /salePriceLog

    router.post('/salePriceLog/lst', function(req, res, next) {
        sql2.connect(conns, function(err) {
            if (err) {
                console.log(err);
            } else {
                let body = req.body;
                console.log(body);
                var request = new sql2.Request();

                var strSql = "";
                strSql += " SELECT tmp2.* FROM (                                                                                              ";
                strSql += " 	SELECT ROW_NUMBER () OVER(ORDER BY tmp1.[RowNum]) [RowNum2], tmp1.* FROM (                                    ";
                strSql += "         SELECT ROW_NUMBER () OVER(ORDER BY t.[ItemName]) [RowNum], t.* FROM [dbo].[Qmart RP CheckSalePrice Log] t ";
                strSql += " 	) tmp1 WHERE tmp1.[RowNum] > @firstPage                                                                       ";
                strSql += " ) tmp2 WHERE 1 = 1                                                                                                ";

                if (body.firstPage) {
                    request.input('firstPage', sql2.Numeric(10, 0), body.firstPage);
                } else {
                    request.input('firstPage', sql2.Numeric(10, 0), 0);
                }
                if (body.pageSize) {
                    strSql += " AND tmp2.[RowNum2] <= @pageSize            ";
                    request.input('pageSize', sql2.Numeric(10, 0), body.pageSize);
                }
                console.log(strSql);

                request.query(strSql, function(err, result) {

                    if (err) {
                        console.log(err);
                        res.sendStatus(500, err);
                    } else {
                        var rowsCount = result.rowsAffected;
                        console.log('rowsCount:' + rowsCount);
                        console.log('data:' + result.recordsets[0]);
                        res.status(200).json(result.recordsets[0]);
                    }
                    sql2.close();
                }); // request.query
            }
        }); // sql.conn
    }); // post /salePriceLog/lst

    router.get('/lstbarcode', function(req, res, next) {
        sql2.connect(conns, function(err) {
            if (err) {
                console.log(err);
            } else {
                let body = req.body;
                console.log(body);
                var request = new sql2.Request();

                var strSql = "";
                strSql += " SELECT [Barcode No_] as barcode from [QMART-GOLIVE$Active Sales Price] ";
                console.log(strSql);

                request.query(strSql, function(err, result) {

                    if (err) {
                        console.log(err);
                        res.sendStatus(500, err);
                    } else {
                        var rowsCount = result.rowsAffected;
                        console.log('rowsCount:' + rowsCount);
                        console.log('data:' + result.recordsets[0]);
                        res.status(200).json(result.recordsets[0]);
                    }
                    sql2.close();
                }); // request.query
            }
        }); // sql.conn
    }); // post /salePriceLog/lst

    return router;
};

module.exports = routes;
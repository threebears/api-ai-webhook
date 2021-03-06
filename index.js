'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');

var options = {
    hostname: 'liehacker.ddns.net',
    port: 8889,
    path: '/delivery_ec.php'
  };
 
const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';
        var dataDelivery = '';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.action == '배송문의') {
                    /*
                    http.request(options, function(response){
                        var serverData = '';
                        response.on('data', function (chunk) {

                          dataDelivery += chunk;
                      });
                      response.on('end', function () {
                        console.log("received server data:");
                        console.log(serverData);
                        console.log('result: ', speech);
                          
                          //speech = dataDelivery;
                            if (dataDelivery) {
                                return res.json({
                                    speech: '원하시는 상품을 선택해 주세요',
                                    displayText: '',
                                    source: 'api-ai-webhook',
                                    data: JSON.parse('{"list1":[{"itemName":"델 노트북 신종  64G","No":697796554511,"status":"배송출발하였습니다."}]}')
                                });
                                
                            } else {
                                return res.json({
                                    speech: '주문하신 상품이 없습니다',
                                    displayText: '주문하신 상품이 없습니다',
                                    source: 'api-ai-webhook'
                                });
                            }
                          
                      });
                    }).end();
                    */
                    return res.json({
                                    speech: '원하시는 상품을 선택해 주세요',
                                    displayText: '',
                                    source: 'api-ai-webhook',
                                    data: JSON.parse('{"list1": [{"itemName": "델 노트북 신종  64G", "No": 697796554511,"status": "배송출발하였습니다."}] ,"list2": [{"itemName": "커피사줘~","No": 697796554517,"status": "배송준비중."}] ,"list3": [{"itemName": "삼성 기어3","No": 697796554519,"status": "결제완료."}]}')
                                });
                    
                    
                } else if (requestBody.result.action === 'FAQ') {
                    speech += 'FAQ 입니다.';
                    
                    return res.json({
                                    speech: speech,
                                    displayText: speech,
                                    source: 'api-ai-webhook'
                                });
                    
                    
                } else {
                    speech += '알수 없는 요청 입니다.';
                    
                    return res.json({
                                    speech: speech,
                                    displayText: speech,
                                    source: 'api-ai-webhook'
                                });
                }
/*
                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }
                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
*/
            } else {
                return res.json({
                                    speech: '2',
                                    displayText: '',
                                    source: 'api-ai-webhook'
                                });
            }

        } else {
            return res.json({
                                    speech: '3',
                                    displayText: '',
                                    source: 'api-ai-webhook'
                                });
        }


    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 10000), function () {
    console.log("Server listening");
});

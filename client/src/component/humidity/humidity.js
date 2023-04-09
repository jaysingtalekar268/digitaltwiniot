import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './humidity.css';
import { json } from "react-router-dom";

function Humidity() {

    const [roomTemp, setRTemp] = useState("");
    const [roomTLimit, setRLimit] = useState();

    const temp_slider_style = {
        "margin-top": "200px",
        height: "50px"
    };
    const getTemp = async () => {

        let tempResult = await fetch("http://192.168.0.104:1880/getupdate", {
            method: "GET",

            headers: {
                'Content-type': 'application/json'
            }
        });

        tempResult = await tempResult.json();
        if (tempResult.humd_curr) {
            alert("ok got tempaearture")
            setRTemp(tempResult);
            setRLimit(tempResult.humd_limit);

        }
        else {
            alert("someething went wrong");
        }



    };

    useEffect(() => {
        getTemp();
    }, []);

   
    const setHumdLimit = async () => {

        let tempResult = await fetch("http://192.168.0.104:1880/sethumd", {
            method: "POST",
            body: JSON.stringify({
                humd_limit: roomTLimit,

            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        tempResult = await tempResult.json();
        if (tempResult.humd_limit) {
            alert("ok limit set")



        }
        else {
            alert("failed to change limit");
        }



    };
    if (roomTemp) {
        return (

            <Container>
                <Row>

                    <Col className="col" >

                        <Container className={roomTemp.humd_curr > roomTemp.humd_limit ? "room room_danger" : " room room_normal"}>
                            <h3>Room 1 Humidity</h3>

                            <div className="display_panel"><p className="display_digit">{roomTemp.humd_curr}</p></div>
                            <div className="temp_meter">
                                <div className="temp_level">
                                    <span style={{ "margin-top": 250 - roomTemp.humd_curr * 2.5, height: roomTemp.humd_curr * 2.5 }} className={roomTemp.humd_curr > 50 ? "temp_slider room_danger" : " temp_slider room_normal"}>{roomTemp.temp_curr}</span>

                                </div>
                                <div className="temp_digit">
                                    <span class="temp_label">100</span>
                                    <span class="temp_label">90</span>
                                    <span class="temp_label">80</span>
                                    <span class="temp_label">70 </span>
                                    <span class="temp_label">60 </span>
                                    <span class="temp_label">50 </span>
                                    <span class="temp_label">40</span>
                                    <span class="temp_label">30</span>
                                    <span class="temp_label">20</span>
                                    <span class="temp_label">10</span>
                                    <span class="temp_label">0</span>
                                </div>
                            </div>


                            <Container>
                            <label>Current Limit</label>
                            <input onChange={(e) => setRLimit(Number(e.target.value))} placeholder="loading limit" value={roomTLimit} type="number"></input>
                            <button onClick={() => setHumdLimit()}>Update Limit</button>
                        </Container>
                        </Container>
                       
                    </Col>


                </Row>
            </Container>
        );
    }
    else {
        return (
            "Fetching room temparatures"
        );
    }

};

export default Humidity;

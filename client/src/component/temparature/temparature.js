import { useEffect, useState } from "react";
import { Container, Row, Col, Tabs, Tab, Spinner } from "react-bootstrap";
import { FadeLoader } from "react-spinners";
import './temparature.css';

function Temperature() {

    const [roomTemp, setRTemp] = useState("");
    const [roomTLimit, setRLimit] = useState();
    const [fan1, setFan1] = useState();
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
        if (tempResult.temp_curr) {
            alert("ok got tempaearture")
            setRTemp(tempResult);
            setFan1(tempResult.fan_status);
            setRLimit(tempResult.temp_limit);
        }
        else {
            alert("someething went wrong");
        }



    };

    const setTempLimit = async () => {
        // alert("fan status",fan1);
        let tempResult = await fetch("http://192.168.0.104:1880/settemp", {
            method: "POST",
            body: JSON.stringify({
                temp_limit: roomTLimit,
                fan_status: fan1

            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        tempResult = await tempResult.json();
        if (tempResult.temp_limit) {
            alert("ok limit set")



        }
        else {
            alert("failed to change limit");
        }



    };
    useEffect(() => {
        getTemp();
    }, []);

    useEffect(() => {
        setTempLimit();

    }, [fan1]);

    const setfan = (j) => {
        alert(j);
        console.warn(j);
        setFan1(Number(j));


    };


    if (roomTemp) {
        return (

            <Container>

                <Row>

                    <Col className="col" >

                        <Container className={roomTemp.temp_curr > roomTemp.temp_limit ? "room room_danger" : " room room_normal"}>
                            <h3>Room 1 Temperature</h3>

                            <div className="display_panel"><p className="display_digit">{roomTemp.temp_curr}</p></div>
                            <Container className="sub_room">
                                <div className="temp_meter">
                                    <div className="temp_level">
                                        <span style={{ "margin-top": 250 - roomTemp.temp_curr * 2.5, height: roomTemp.temp_curr * 2.5 }} className={roomTemp.temp_curr > roomTemp.temp_limit ? "temp_slider room_danger" : " temp_slider room_normal"}>{roomTemp.temp_curr}</span>

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

                                    <button onClick={() => setfan(1)} disabled={fan1 == 1 ? true : false}> On </button>
                                    <button onClick={() => setfan(0)} disabled={fan1 == 0 ? true : false}>Off </button>
                                    <FadeLoader className="fan" speedMultiplier={fan1}></FadeLoader>



                                </Container>
                                <Container>
                                    <label>Current Limit</label>
                                    <input onChange={(e) => setRLimit(Number(e.target.value))} placeholder="loading limit" value={roomTLimit} type="number"></input>
                                    <button onClick={() => setTempLimit()}>Update Limit</button>
                                </Container>
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

export default Temperature;

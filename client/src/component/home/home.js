import { Container, Spinner, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import './home.css';

function Home() {

   

    const [roomTemp, setRTemp] = useState("");
    const navigate = useNavigate();
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

        }
        else {
            alert("someething went wrong");
        }



    };

    useEffect(() => {
        getTemp();
    }, []);

    if (roomTemp) {
        return (
            <Container>
                <Row>
                    <Col className="col" >

                        <Container className={roomTemp.temp_curr > roomTemp.temp_limit ? "room room_danger" : " room room_normal"}>
                            <h3>Room 1 Temperature</h3>

                            <div className="display_panel"><p className="display_digit">{roomTemp.temp_curr}</p></div>
                            <button onClick={() => navigate("/Temperature")}>Take Action</button>
                        </Container>
                        <Container className={roomTemp.humd_curr > roomTemp.humd_limit ? "room room_danger" : " room room_normal"}>
                            <h3>Room 1 Humidity</h3>

                            <div className="display_panel"><p className="display_digit">{roomTemp.humd_curr}</p></div>
                            <button onClick={() => navigate("/Humidity")}>Take Action</button>
                        </Container>

                    </Col>

                </Row>

            </Container>

        )
    }
    else {

        return (
            <Container>Loading data</Container>
        );
    }

};

export default Home;
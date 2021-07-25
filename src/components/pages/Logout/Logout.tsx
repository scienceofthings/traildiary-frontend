import React from 'react'
import {Button, Col, Row} from "react-bootstrap";
import { useLocation } from "wouter"
import {purgeToken} from "../../../misc/jsonWebToken";
import {useTypedDispatch} from "../../../redux";
import {composeLoginPageUri} from "../../../misc/uri";
import {logout} from "../../../redux/slices/app";

const Logout:React.FunctionComponent = () => {
    const dispatch = useTypedDispatch()
    const [, setLocation] = useLocation()
    const onLogout = async (): Promise<void> => {
        await dispatch(logout())
        purgeToken()
        setLocation(composeLoginPageUri())
    }

    return (
        <Row>

            <Col>
                        <Button variant="primary" onClick={onLogout}>
                            Logout
                        </Button>

            </Col>

        </Row>
    )
}

export default Logout
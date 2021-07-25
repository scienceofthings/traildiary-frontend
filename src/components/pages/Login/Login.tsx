import React, { useState } from 'react'
import {Button, Col, Form, Row} from "react-bootstrap";
import {useTypedDispatch} from "../../../redux";
import {authenticate} from "../../../redux/api/authenticate";
import styles from './Login.module.scss'
import {useLocation} from "wouter";
import {composeMapSearchPageUri} from "../../../misc/uri";

const Login:React.FunctionComponent = () => {
    const dispatch = useTypedDispatch()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [, setLocation] = useLocation()
    const [authenticationErrorIsShown, setShowAuthenticationError] = useState(false)

    const [authenticationPending, setAuthenticationPending] = useState(false)

    const onAuthenticationSubmit = async (): Promise<void> => {
        setAuthenticationPending(true)
        const action = await dispatch(authenticate({username, password}))
        if (authenticate.fulfilled.match(action)) {
            setShowAuthenticationError(false)
            setLocation(composeMapSearchPageUri())

        } else if (authenticate.rejected.match(action)) {
            setShowAuthenticationError(true)
        }
        setAuthenticationPending(false)

    }
    return (
        <Row>
            <Col/>
            <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Email-Adresse</Form.Label>
                            <Form.Control
                                placeholder="Benutzername eingeben"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Passwort"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {authenticationErrorIsShown && (
                            <Form.Group className="mb-3">
                                <Form.Text className={styles.loginerror}>
                                    Der Login war nicht erfolgreich.
                                </Form.Text>
                            </Form.Group>
                        )}
                        <Button variant="primary" onClick={onAuthenticationSubmit} disabled={authenticationPending}>
                            {authenticationPending ? "Bitte Warten" : "Login"}
                        </Button>
                    </Form>
            </Col>
            <Col/>
        </Row>
    )
}

export default Login
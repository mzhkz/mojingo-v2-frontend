import React from 'react';
import {Grid, Header, Modal, Segment} from 'semantic-ui-react'
import {Button, Checkbox, Form} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'


export class Authorize extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forgetPasswordModal: false,
        };
    }

    render() {
        return (
            <Form>
                <Form.Field>
                    <label>ユーザー名</label>
                    <input placeholder='ユーザー名' />
                </Form.Field>
                <Form.Field>
                    <label>パスワード</label>
                    <input type={"password"} placeholder='パスワード' />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='セッションを維持する' />
                </Form.Field>
                <Form.Field>
                    <a onClick={() => this.setState({forgetPasswordModal: true})} href={'#'}>アカウントをお持ちではない方、またはパスワードを忘れた方。</a>
                    <Modal open={this.state.forgetPasswordModal}>
                        <Modal.Content image>
                            <Modal.Description>
                                <Header>塾長に直接ご連絡ください。</Header>
                                <p>
                                    Web上では、アカウントの登録及びパスワードの変更ができません。
                                </p>
                                <Button onClick={() => this.setState({forgetPasswordModal: false})}>閉じる</Button>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>
                </Form.Field>
                <Button type='submit' primary>ログイン</Button>
            </Form>
        )
    }
}
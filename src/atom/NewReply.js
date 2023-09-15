import React from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export default function NewReply({auth, reply, replyOnReply, onInputReplyContent=f=>f, mngReply=f=>f}) {
    console.log(reply);
        if (!auth.userNick)
            return;
        return (
            <Container>
                <Row>
                    <Col>댓글 달기</Col>
                </Row>
                <Row>
                    <Col sm={10}><input placeholder='댓글 달기' //onChange={(e) => setNewReplyContent(e.target.value)}
                    onInput={(e)=>onInputReplyContent(e,reply.id)} value={replyOnReply.get(reply.id)} style={{ height: "100%", width: "100%" }}></input></Col>
                    <Col sm><Button variant="btn btn-light" onClick={(e) => { mngReply(e, reply.id) }}>적용</Button></Col>
                </Row>
            </Container>
        );
}

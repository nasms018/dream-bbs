import { useParams } from 'react-router-dom';
import Fetch from 'toolbox/Fetch';
import { displayDate } from "toolbox/displayDate";


export default function MemberList() {
    const { ownerId } = useParams();  // APP에 있는 :id 와 이름 통일  //http://localhost:8080/post/anonymous/listAll/000n
    const listAllMemberUri = `/party/anonymous/listAllMember?ownerId=${ownerId}`



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>성별</th>
                        <th>가입일</th>
                    </tr>
                </thead>
                <tbody>
                    <Fetch uri={listAllMemberUri} renderSuccess={RenderSuccess} />
                </tbody>
            </table>
        </div>
    )
}

function RenderSuccess(memberList) {
    return memberList.map(member => (
        <>
            <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.nick}</td>
                <td>{member.sex ? "남성":"여성"}</td>
                <td>{displayDate(member.regDt, member.uptDt)}</td>
            </tr>
            {member.listContactPoint.map(cp => (
                <tr key={member.id + cp.cpType}>
                    <td></td>
                    <td>{cp.cpType}</td>
                    <td>{cp.cpVal}</td>
                </tr>
            ))}
        </>
    ))
}

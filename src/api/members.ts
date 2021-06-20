import { Member } from "@/type/member"
import { apiEndpoint } from "./settings"

export async function getMembers(): Promise<Response> {
    return await fetch(apiEndpoint + `/members`, {
        credentials: "include",
    })
}

export async function postMember(member: Member): Promise<Response> {
    return await fetch(apiEndpoint + `/member`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(member),
    })
}

export function deleteMember(id: number): Promise<Response> {
    return fetch(apiEndpoint + "/member/delete/" + id, {
        method: "POST",
        credentials: "include",
    })
}

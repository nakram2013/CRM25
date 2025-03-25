interface Agent {
    agentID: number;
    firstName: string;
    lastName: string;
    role: string;
}

interface AddedBy {
    firstName: string;
    lastName: string;
    role: string;
}

export interface ILeadPreview {
    leadId: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    contactNo: string;
    reMarks: string | null;
    agent: Agent;
    whatsApp: string;
    occupation: string;
    step: string;
    status: string;
    addedBy: AddedBy;
}

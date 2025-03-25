export interface ILead {
    leadId?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    city?: string,
    contactNo?: string,
    reMarks?: string,
    agentID?: number,
    assignedBy?: number,
    whatsApp?: string,
    projectID?: number,
    projectName?: string,
    leadType?: number,
    addedBy?: number,
    addedDate?: Date,
    occupation?: string,
    status?: string,
    statusName?: string,
    step?: number;
    referenceID?: number;
    title?: string;
    nextActivityDate?: Date;
    sourceofComunication?: string;
    nextActivitySource?: string;
    attachment?: string;
}
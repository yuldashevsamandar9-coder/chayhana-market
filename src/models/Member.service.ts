import MemberModel from "../schema/Member.modul";

class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }
}

export default MemberService;

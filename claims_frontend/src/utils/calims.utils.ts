export class ClaimsUtils {
  static adaptClaimFields(claim) {
    claim.client_contract ??= '-';
    claim.client_name ??= '-';
    claim.claim_phone ??= '-';
    claim.claim_addr ??= '-';
    claim.autor ??= '-';
    claim.assigned ??= '-';
    claim.comment ??= '-';
    claim.work_commentary ??= '-';
    claim.lw_date_change ??= '-';
    claim.status_name ??= '-';

    claim.claim_addr = claim.claim_addr.replaceAll('_', '-');
    claim.claim_date = claim.claim_date.replaceAll('_', '-');
    claim.client_contract = claim.client_contract.replaceAll('_', '-');
    claim.client_name = claim.client_name.replaceAll('_', '-');
    claim.claim_phone = claim.claim_phone.replaceAll('_', '-');
    claim.autor = claim.autor.replaceAll('_', '-');
    claim.assigned = claim.assigned.replaceAll('_', '-');
    claim.comment = claim.comment.replaceAll('_', '-');

    return claim;
  }
}

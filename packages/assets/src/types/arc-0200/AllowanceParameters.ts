/**
 * @property {string} owner - The address of the owner of the funds.
 * @property {string} spender - The address of the intended spender of the owner's funds.
 */
interface AllowanceParameters {
  owner: string;
  spender: string;
}

export default AllowanceParameters;

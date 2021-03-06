import {
    fromViewingKey,
} from '~/utils/note';
import ConnectionService from '~/client/services/ConnectionService';
import provePrivateRange from '~/client/apis/privateRange/prove';

const dataProperties = [
    'noteHash',
    'value',
    'viewingKey',
    'owner',
    'asset',
    'status',
];

export default class ZkNote {
    constructor({
        id,
        ...note
    } = {}) {
        dataProperties.forEach((key) => {
            this[key] = note[key];
        });
        this.id = id;
    }

    get valid() {
        return typeof this.value === 'number';
    }

    get visible() {
        return !!this.viewingKey;
    }

    get destroyed() {
        return this.status === 'DESTROYED';
    }

    /**
     *
     * @function note.export
     * @description Description: Export an aztec.js note instance for use in proofs.
     *
     * @returns {AztecNote} note An AZTEC note.
     *
     */
    async export() {
        if (!this.visible) {
            return null;
        }

        const {
            note,
        } = await ConnectionService.query(
            'noteWithViewingKey',
            { id: this.id },
        ) || {};

        if (!note || !note.decryptedViewingKey) {
            return null;
        }

        const {
            decryptedViewingKey,
            owner = {},
        } = note;

        return fromViewingKey(decryptedViewingKey, owner.address);
    }

    /**
     *
     * @function note.grantAccess
     * @description Description: Grant note view access to an array of Ethereum addresses.
     *
     * @param {[Address]} addresses Array of Ethereum addresses that are to be granted note view access.
     *
     * @returns {Boolean} success Boolean describing whether the granting of view access was successfull.
     *
     */
    async grantAccess(addresses) {
        if (!this.visible
            || this.destroyed
        ) {
            return false;
        }

        const addressList = typeof addresses === 'string'
            ? [addresses]
            : addresses;

        const {
            success,
        } = await ConnectionService.query(
            'grantNoteAccess',
            {
                id: this.id,
                addresses: addressList,
            },
        ) || {};

        return success || false;
    }

    /**
     *
     * @function note.equal
     * @description Description: Construct a proof that the note is equal to a particular value.
     *
     * @param {ZkNote|AztecNote} comparisonNote Note that is being compared.
     *
     * @param {Object} options Optional parameters to be passed:
     *
     * - *sender* (Address): The proof sender. Will use current address if empty.
     *
     * - *remainderNote* (ZkNote|AztecNote): Helper note to make the equation hold.
     *   In this api, its value should be 0.
     *   The sdk will construct one if not provided.
     *
     * @returns {PrivateRangeProof} proof Instance of the constructed proof.
     *
     */
    async equal(comparisonNote, {
        sender = '',
        remainderNote = null,
    } = {}) {
        if (!this.visible) {
            return false;
        }

        const originalNote = await this.export();
        return provePrivateRange({
            type: 'eq',
            originalNote,
            comparisonNote,
            remainderNote,
            sender,
        });
    }

    /**
     *
     * @function note.greaterThan
     * @description Description: Construct a proof that the note is greater than a particular value.
     *
     * @param {ZkNote|AztecNote} comparisonNote Note that is being compared.
     *
     * @param {Object} options Optional parameters to be passed:
     *
     * - *sender* (Address): The proof sender. Will use current address if empty.
     *
     * - *remainderNote* (ZkNote|AztecNote): Helper note to make the equation hold.
     *   In this api, its value should be the value of the original zkNote minus the value of `comparisonNote`.
     *   The sdk will construct one if not provided.
     *
     * @returns {PrivateRangeProof} proof Instance of the constructed proof.
     *
     */
    async greaterThan(comparisonNote, {
        sender = '',
        remainderNote = null,
    } = {}) {
        if (!this.visible) {
            return false;
        }

        const originalNote = await this.export();
        return provePrivateRange({
            type: 'gt',
            originalNote,
            comparisonNote,
            remainderNote,
            sender,
        });
    }

    /**
     *
     * @function note.lessThan
     * @description Description: Construct a proof that the note value is less than a particular value.
     *
     * @param {ZkNote|AztecNote} comparisonNote Note that is being compared.
     *
     * @param {Object} options Optional parameters to be passed:
     *
     * - *sender* (Address): The proof sender. Will use current address if empty.
     *
     * - *remainderNote* (ZkNote|AztecNote): Helper note to make the equation hold.
     *   In this api, its value should be the value of `comparisonNote` minus the value of the original zkNote.
     *   The sdk will construct one if not provided.
     *
     * @returns {PrivateRangeProof} proof Instance of the constructed proof.
     *
     */
    async lessThan(comparisonNote, {
        sender = '',
        remainderNote = null,
    } = {}) {
        if (!this.visible) {
            return false;
        }

        const originalNote = await this.export();
        return provePrivateRange({
            type: 'lt',
            originalNote,
            comparisonNote,
            remainderNote,
            sender,
        });
    }

    /**
     *
     * @function note.greaterThanOrEqualTo
     * @description Description: Construct a proof that the note value is greater than or equal to a particular value.
     *
     * @param {ZkNote|AztecNote} comparisonNote Note that is being compared.
     *
     * @param {Object} options Optional parameters to be passed:
     *
     * - *sender* (Address): The proof sender. Will use current address if empty.
     *
     * - *remainderNote* (ZkNote|AztecNote): Helper note to make the equation hold.
     *   In this api, its value should be the value of the original zkNote minus the value of `comparisonNote`.
     *   The sdk will construct one if not provided.
     *
     * @returns {PrivateRangeProof} proof Instance of the constructed proof.
     *
     */
    async greaterThanOrEqualTo(comparisonNote, {
        sender = '',
        remainderNote = null,
    } = {}) {
        if (!this.visible) {
            return false;
        }

        const originalNote = await this.export();
        return provePrivateRange({
            type: 'gte',
            originalNote,
            comparisonNote,
            remainderNote,
            sender,
        });
    }

    /**
     *
     * @function note.lessThanOrEqualTo
     * @description Description: Construct a proof that the note value is less than or equal to a particular value.
     *
     * @param {ZkNote|AztecNote} comparisonNote Note that is being compared.
     *
     * @param {Object} options Optional parameters to be passed:
     *
     * - *sender* (Address): The proof sender. Will use current address if empty.
     *
     * - *remainderNote* (ZkNote|AztecNote): Helper note to make the equation hold.
     *   In this api, its value should be the value of `comparisonNote` minus the value of the original zkNote.
     *   The sdk will construct one if not provided.
     *
     * @returns {PrivateRangeProof} proof Instance of the constructed proof.
     *
     */
    async lessThanOrEqualTo(comparisonNote, {
        sender = '',
        remainderNote = null,
    } = {}) {
        if (!this.visible) {
            return false;
        }

        const originalNote = await this.export();
        return provePrivateRange({
            type: 'lte',
            originalNote,
            comparisonNote,
            remainderNote,
            sender,
        });
    }
}

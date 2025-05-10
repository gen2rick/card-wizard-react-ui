
export const CARD_TYPES = {
  TRIGGER: 'trigger',
  CONDITION: 'condition',
  ACTION: 'action',
  EMAIL: 'email'
};

// These are JSDoc comments to maintain type information in JavaScript
/**
 * @typedef {Object} Position
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} CardType
 * @property {number} id
 * @property {('trigger'|'condition'|'action'|'email')} type
 * @property {string} text
 * @property {Position} position
 * @property {number[]} [next]
 * @property {number} [yes]
 * @property {number} [no]
 * @property {boolean} [isDragging]
 */

/**
 * @typedef {Object} ConnectionPoint
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Connection
 * @property {string} id
 * @property {number} from
 * @property {number} to
 * @property {ConnectionPoint[]} points
 * @property {('next'|'yes'|'no')} type
 * @property {boolean} [isEndpoint]
 * @property {ConnectionPoint} fromPos
 * @property {ConnectionPoint} toPos
 */

/**
 * @typedef {Object} FlowchartData
 * @property {CardType[]} nodes
 * @property {Connection[]} connections
 */

/**
 * @typedef {function} AddCardFunction
 * @param {number} sourceCardId
 * @param {('next'|'yes'|'no')} connectionType
 * @param {Position} position
 * @returns {void}
 */

/**
 * @typedef {function} RemoveCardFunction
 * @param {number} cardId
 * @returns {void}
 */

/**
 * @typedef {function} UpdateCardPositionFunction
 * @param {number} cardId
 * @param {Position} newPosition
 * @returns {void}
 */

/**
 * @typedef {('action'|'condition'|'email'|'trigger')} CardTypeOption
 */

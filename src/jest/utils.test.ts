import { isMovableCase } from "../utils"
import {
    allyColor,
    ennemyColor,
    isInTabLimit,
    isSamePosition /*whichPawnAtPosition, functionInEveryDirection*/,
} from "../utils"

describe("isSamePosition", () => {
    it("should return true if the positions are the same", () => {
        expect(isSamePosition([1, 2], [1, 2])).toBe(true)
    })

    it("should return false if the positions are not the same", () => {
        expect(isSamePosition([9, 2], [1, 2])).toBe(false)
    })
})

describe("ennemyColor", () => {
    it("should return true if the colors are different", () => {
        expect(ennemyColor("white")).toBe("black")
    })
    it("should return false if the colors are the same", () => {
        expect(ennemyColor("black")).toBe("white")
    })
})

// describe("functionInEveryDirection", () => {
//     it("should return true if the function is true in every direction", () => {
//         expect(functionInEveryDirection([1, 2], (x, y) => x > 0 && y > 0)).toBe(true)
//     })
//     it("should return false if the function is false in one direction", () => {
//         expect(functionInEveryDirection([1, 2], (x, y) => x > 0 && y < 0)).toBe(false)
//     })
// })

describe("allyColor", () => {
    it("should return true if the colors are the same", () => {
        expect(allyColor(3)).toBe("black")
    })
    it("should return false if the colors are different", () => {
        expect(allyColor(12)).toBe("white")
    })
})

describe("isInTabLimit", () => {
    it("should return true if the positions are in the tab", () => {
        expect(isInTabLimit(1, 2)).toBe(true)
    })
    it("should return false if the positions are not in the tab", () => {
        expect(isInTabLimit(19, 2)).toBe(false)
    })
})

// describe("whichPawnAtPosition", () => {
//     it("should return true if the pawn is at the position", () => {
//         expect(whichPawnAtPosition([1,2], "white")).toBe(true)
//     })
//     it("should return false if the pawn is not at the position", () => {
//         expect(whichPawnAtPosition()).toBe(false)
//     })
// })

describe("isMovableCase", () => {
    // Test pour le cas où la case est vide et adjacente au pion sélectionné
    it("should return true if the case is empty and adjacent to the selected pawn", () => {
        expect(isMovableCase([1, 1], [2, 2], null)).toBe(true);
    });

    // Test pour le cas où la case n'est pas adjacente au pion sélectionné
    it("should return false if the case is not adjacent to the selected pawn", () => {
        expect(isMovableCase([1, 1], [3, 3], null)).toBe(false);
    });

    // Test pour le cas où la case est adjacente, mais elle n'est pas vide
    it("should return false if the case is adjacent but not empty", () => {
        expect(isMovableCase([1, 1], [2, 2], "white")).toBe(false);
    });

    // Test pour le cas où la case est vide, mais elle n'est pas adjacente
    it("should return false if the case is empty but not adjacent to the selected pawn", () => {
        expect(isMovableCase([1, 1], [4, 4], null)).toBe(false);
    });
});

describe('isEatMoveWithDirection', () => {
    it('should return false if jump position is out of bounds', () => {
      expect(isEatMoveWithDirection(1, 1, { position: [1, 1], color: 'white' }, { pawnPos: [0, 0], pawnColor: 'white' }, { position: [2, 2], color: 'black' })).toBe(false);
    });
  
    it('should return false if the jump position is not empty', () => {
      expect(isEatMoveWithDirection(1, 1, { position: [1, 1], color: 'white' }, { pawnPos: [2, 2], pawnColor: 'white' }, { position: [2, 2], color: 'black' })).toBe(false);
    });
  
    it('should return false if there is no adjacent enemy pawn', () => {
      expect(isEatMoveWithDirection(1, 1, { position: [1, 1], color: 'white' }, { pawnPos: [3, 3], pawnColor: 'white' }, { position: [2, 2], color: 'black' })).toBe(false);
    });
  
    it('should return true if jump position is valid and conditions are met', () => {
      expect(isEatMoveWithDirection(1, 1, { position: [1, 1], color: 'white' }, { pawnPos: [2, 2], pawnColor: 'white' }, { position: [2, 2], color: 'black' })).toBe(true);
    });
  
  });
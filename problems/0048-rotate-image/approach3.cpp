#include <vector>
class Solution {
public:
    void rotate(std::vector<std::vector<int>>& matrix) {
        int n = (int)matrix.size();
        for (int layer = 0; layer < n / 2; ++layer) { // rings from the outside in; an odd n's centre stays put // @viz layer
            int first = layer, last = n - 1 - layer; // @viz layer
            for (int k = 0; k < last - first; ++k) { // each cell on the ring's top side starts a cycle of 4 // @viz cycle
                int top = matrix[first][first + k]; // save top // @viz cycle
                matrix[first][first + k] = matrix[last - k][first]; // left -> top // @viz move
                matrix[last - k][first] = matrix[last][last - k]; // bottom -> left // @viz move
                matrix[last][last - k] = matrix[first + k][last]; // right -> bottom // @viz move
                matrix[first + k][last] = top; // saved top -> right // @viz move
            }
        }
    }
};

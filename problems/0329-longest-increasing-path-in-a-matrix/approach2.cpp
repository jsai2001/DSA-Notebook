#include <utility>
#include <vector>
class Solution {
public:
    int longestIncreasingPath(std::vector<std::vector<int>>& matrix) {
        const int R = matrix.size(), C = matrix[0].size(); // @viz init
        const int dr[] = {1, -1, 0, 0}, dc[] = {0, 0, 1, -1}; // @viz init
        std::vector<std::vector<int>> bigger(R, std::vector<int>(C, 0)); // how many neighbours are bigger // @viz count
        std::vector<std::pair<int, int>> layer; // @viz count
        for (int r = 0; r < R; ++r) // @viz count
            for (int c = 0; c < C; ++c) { // @viz count
                for (int d = 0; d < 4; ++d) { // @viz count
                    int x = r + dr[d], y = c + dc[d]; // @viz count
                    if (x >= 0 && x < R && y >= 0 && y < C && matrix[x][y] > matrix[r][c]) ++bigger[r][c]; // @viz count
                }
                if (bigger[r][c] == 0) layer.push_back({r, c}); // local peaks: every path ends at one // @viz count
            }
        int length = 0; // @viz init
        while (!layer.empty()) { // peel the matrix from the peaks down, one layer per step of the path // @viz peel
            ++length; // @viz peel
            std::vector<std::pair<int, int>> next; // @viz peel
            for (auto [r, c] : layer) // @viz peel
                for (int d = 0; d < 4; ++d) { // @viz drop
                    int x = r + dr[d], y = c + dc[d]; // @viz drop
                    if (x >= 0 && x < R && y >= 0 && y < C && matrix[x][y] < matrix[r][c] && --bigger[x][y] == 0) // a smaller neighbour loses one bigger neighbour // @viz drop
                        next.push_back({x, y}); // all its bigger neighbours are peeled: it's in the next layer // @viz drop
                }
            layer.swap(next); // @viz peel
        }
        return length; // the number of layers = the longest path // @viz return
    }
};

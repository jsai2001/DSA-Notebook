#include <cstdlib>
#include <utility>
#include <vector>
class DetectSquares {
public:
    // Coordinates are 0..1000, so a 1001 × 1001 table can hold the counts.
    DetectSquares() : cnt(1001, std::vector<int>(1001, 0)) {} // @viz init

    void add(std::vector<int> point) {
        int x = point[0], y = point[1]; // @viz add
        if (cnt[x][y]++ == 0) distinct.push_back({x, y}); // remember each point once // @viz add
    }

    int count(std::vector<int> point) {
        int x = point[0], y = point[1]; // @viz count
        int total = 0; // @viz count
        for (const auto& [px, py] : distinct) { // each distinct stored point, as the corner across from the query // @viz diag
            if (px == x || std::abs(px - x) != std::abs(py - y)) continue; // not a diagonal (or no area) // @viz diag
            total += cnt[px][py] * cnt[x][py] * cnt[px][y]; // the other two corners; repeats multiply // @viz corner, sum
        }
        return total; // @viz return
    }

private:
    std::vector<std::vector<int>> cnt; // cnt[x][y]: how many times (x, y) was added
    std::vector<std::pair<int, int>> distinct;
};

#include <cstdlib>
#include <utility>
#include <vector>
class DetectSquares {
public:
    DetectSquares() {} // @viz init

    void add(std::vector<int> point) {
        points.push_back({point[0], point[1]}); // @viz add
    }

    int count(std::vector<int> point) {
        int x = point[0], y = point[1]; // @viz count
        int total = 0; // @viz count
        for (const auto& [px, py] : points) { // try each stored point as the corner across from the query // @viz diag
            if (px == x || std::abs(px - x) != std::abs(py - y)) continue; // not a diagonal (or no area) // @viz diag
            // The other two corners are (x, py) and (px, y): count them by scanning again.
            int a = 0, b = 0; // @viz corner
            for (const auto& [qx, qy] : points) { // @viz corner
                if (qx == x && qy == py) ++a; // @viz corner
                if (qx == px && qy == y) ++b; // @viz corner
            }
            total += a * b; // @viz sum
        }
        return total; // @viz return
    }

private:
    std::vector<std::pair<int, int>> points; // every added point, repeats included
};

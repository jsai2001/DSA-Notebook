#include <vector>
class DetectSquares {
public:
    // Coordinates are 0..1000, so a 1001 × 1001 table can hold the counts.
    DetectSquares() : cnt(1001, std::vector<int>(1001, 0)), col(1001) {} // @viz init

    void add(std::vector<int> point) {
        int x = point[0], y = point[1]; // @viz add
        if (cnt[x][y]++ == 0) col[x].push_back(y); // each y once per column // @viz add
    }

    int count(std::vector<int> point) {
        int x = point[0], y = point[1]; // @viz count
        int total = 0; // @viz count
        for (int y2 : col[x]) { // a point straight above or below the query: one side of the square // @viz side
            if (y2 == y) continue; // same point: no side // @viz side
            int d = y2 - y; // the side length (with a sign) // @viz side
            for (int x2 : {x + d, x - d}) { // the square can be on the right or on the left // @viz corner
                if (x2 < 0 || x2 > 1000) continue; // off the grid: no points there // @viz corner
                total += cnt[x][y2] * cnt[x2][y] * cnt[x2][y2]; // @viz sum
            }
        }
        return total; // @viz return
    }

private:
    std::vector<std::vector<int>> cnt; // cnt[x][y]: how many times (x, y) was added
    std::vector<std::vector<int>> col; // col[x]: the distinct y's added in column x
};

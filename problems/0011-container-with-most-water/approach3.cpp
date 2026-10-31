#include <algorithm>
#include <vector>
class Solution {
public:
    int maxArea(std::vector<int>& height) {
        int left = 0, right = height.size() - 1; // @viz init
        int best = 0; // @viz init
        while (left < right) { // @viz loop
            int h = std::min(height[left], height[right]); // @viz area
            best = std::max(best, h * (right - left)); // @viz best
            // A line no taller than h, closer in, can only give a smaller
            // container: skip all of them on both sides in one go.
            while (left < right && height[left] <= h) ++left; // @viz skipleft
            while (left < right && height[right] <= h) --right; // @viz skipright
        }
        return best; // @viz return
    }
};

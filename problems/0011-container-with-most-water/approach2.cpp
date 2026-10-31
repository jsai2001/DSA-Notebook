#include <algorithm>
#include <vector>
class Solution {
public:
    int maxArea(std::vector<int>& height) {
        int left = 0, right = height.size() - 1; // start as wide as possible // @viz init
        int best = 0; // @viz init
        while (left < right) { // @viz loop
            int area = std::min(height[left], height[right]) * (right - left); // @viz area
            best = std::max(best, area); // @viz best
            // Every narrower container that keeps the shorter line is no taller
            // and narrower, so it can't beat this one: drop the shorter line.
            if (height[left] < height[right]) { // @viz move
                ++left; // @viz moveleft
            } else {
                --right; // @viz moveright
            }
        }
        return best; // @viz return
    }
};

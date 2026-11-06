#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> subsetsWithDup(std::vector<int>& nums) {
        std::vector<int> sorted = nums; // @viz init
        std::sort(sorted.begin(), sorted.end()); // equal numbers side by side // @viz init
        std::vector<std::vector<int>> result{{}}; // @viz init
        size_t added = 0; // where the subsets made in the last round start // @viz init
        for (size_t i = 0; i < sorted.size(); ++i) { // @viz next
            // A repeat of the last number only extends the subsets that already used it (made last round).
            size_t begin = (i > 0 && sorted[i] == sorted[i - 1]) ? added : 0; // @viz begin
            added = result.size(); // @viz begin
            for (size_t j = begin; j < added; ++j) { // @viz extend
                std::vector<int> grown = result[j]; // copy first: push_back below can move result's storage // @viz extend
                grown.push_back(sorted[i]); // @viz extend
                result.push_back(std::move(grown)); // @viz extend
            }
        }
        return result; // @viz return
    }
};

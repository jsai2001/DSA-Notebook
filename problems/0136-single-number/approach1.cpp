#include <unordered_map>
#include <vector>
class Solution {
public:
    int singleNumber(std::vector<int>& nums) {
        std::unordered_map<int, int> count; // @viz init
        for (int x : nums) { // @viz count
            ++count[x]; // @viz count
        }
        for (auto& [x, c] : count) { // @viz find
            if (c == 1) return x; // the one value seen once // @viz find
        }
        return 0; // not reached: the input always has one // @viz find
    }
};

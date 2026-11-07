#include <vector>
class Solution {
public:
    bool mergeTriplets(std::vector<std::vector<int>>& triplets, std::vector<int>& target) {
        bool a = false, b = false, c = false; // found a safe triplet that hits target[0], [1], [2] // @viz init
        for (auto& t : triplets) { // @viz scan
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) { // safe to merge // @viz hit
                a |= t[0] == target[0]; // @viz hit
                b |= t[1] == target[1]; // @viz hit
                c |= t[2] == target[2]; // @viz hit
                if (a && b && c) return true; // all three hit: merging those gives the target // @viz return
            }
        }
        return false; // @viz return
    }
};

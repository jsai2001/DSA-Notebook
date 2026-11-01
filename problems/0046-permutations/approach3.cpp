#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> permute(std::vector<int>& nums) {
        std::vector<std::vector<int>> perms{{}}; // all permutations of the numbers seen so far (none yet: one empty one) // @viz init
        for (int x : nums) { // @viz next
            std::vector<std::vector<int>> grown; // @viz next
            for (const std::vector<int>& p : perms) { // @viz insert
                for (size_t pos = 0; pos <= p.size(); ++pos) { // put x in every gap: before, between, after // @viz insert
                    std::vector<int> q = p; // @viz insert
                    q.insert(q.begin() + pos, x); // @viz insert
                    grown.push_back(q); // @viz insert
                }
            }
            perms = grown; // k numbers -> k! permutations // @viz next
        }
        return perms; // @viz return
    }
};

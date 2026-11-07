#include <algorithm>
#include <vector>
class Solution {
public:
    int lengthOfLIS(std::vector<int>& nums) {
        std::vector<int> tails; // tails[L] = the smallest last value of any increasing subsequence of length L + 1 // @viz init
        for (int x : nums) { // @viz each
            auto it = std::lower_bound(tails.begin(), tails.end(), x); // the first tail >= x (tails is always sorted) // @viz search
            if (it == tails.end()) tails.push_back(x); // x is bigger than every tail: it makes a longer subsequence // @viz extend
            else *it = x; // x is a smaller end for that length: keep the smaller one // @viz replace
        }
        return tails.size(); // @viz return
    }
};

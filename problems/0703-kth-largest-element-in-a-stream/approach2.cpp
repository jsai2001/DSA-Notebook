#include <algorithm>
#include <vector>
class KthLargest {
public:
    KthLargest(int k, std::vector<int>& nums) : k(k), nums(nums) {
        std::sort(this->nums.begin(), this->nums.end()); // kept sorted, smallest first // @viz init
    }
    int add(int val) {
        nums.insert(std::upper_bound(nums.begin(), nums.end(), val), val); // binary search for the spot, then shift the rest: O(n) // @viz add
        return nums[nums.size() - k]; // the k-th from the end // @viz answer
    }
private:
    int k;
    std::vector<int> nums;
};

#include <algorithm>
#include <functional>
#include <vector>
class KthLargest {
public:
    KthLargest(int k, std::vector<int>& nums) : k(k), nums(nums) {} // every value seen // @viz init
    int add(int val) {
        nums.push_back(val); // @viz add
        std::sort(nums.begin(), nums.end(), std::greater<int>()); // sort everything again, biggest first // @viz sort
        return nums[k - 1]; // @viz answer
    }
private:
    int k;
    std::vector<int> nums;
};

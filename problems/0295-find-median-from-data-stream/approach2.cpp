#include <algorithm>
#include <vector>
class MedianFinder {
public:
    MedianFinder() {} // @viz init
    void addNum(int num) {
        nums.insert(std::upper_bound(nums.begin(), nums.end(), num), num); // binary search for the spot, then shift: O(n) // @viz add
    }
    double findMedian() {
        size_t n = nums.size(); // already sorted: just read the middle // @viz median
        return n % 2 ? nums[n / 2] : (nums[n / 2 - 1] + (double)nums[n / 2]) / 2; // @viz median
    }
private:
    std::vector<int> nums; // kept sorted
};

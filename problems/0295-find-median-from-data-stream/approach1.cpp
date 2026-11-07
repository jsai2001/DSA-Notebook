#include <algorithm>
#include <vector>
class MedianFinder {
public:
    MedianFinder() {} // @viz init
    void addNum(int num) {
        nums.push_back(num); // O(1) // @viz add
    }
    double findMedian() {
        std::vector<int> s = nums; // sort a copy every time // @viz sort
        std::sort(s.begin(), s.end()); // @viz sort
        size_t n = s.size(); // @viz sort
        return n % 2 ? s[n / 2] : (s[n / 2 - 1] + (double)s[n / 2]) / 2; // the middle, or the mean of the two middles // @viz median
    }
private:
    std::vector<int> nums; // every value, in arrival order
};

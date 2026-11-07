#include <functional>
#include <queue>
#include <vector>
class MedianFinder {
public:
    MedianFinder() {} // @viz init
    void addNum(int num) {
        low.push(num); // go through low first... // @viz add
        high.push(low.top()); // ...so low's biggest moves up: every low <= every high // @viz add
        low.pop(); // @viz add
        if (high.size() > low.size()) { // keep low the same size as high, or one bigger // @viz balance
            low.push(high.top()); // @viz balance
            high.pop(); // @viz balance
        }
    }
    double findMedian() {
        if (low.size() > high.size()) return low.top(); // odd count: the middle is low's top // @viz median
        return (low.top() + (double)high.top()) / 2; // even: the mean of the two tops // @viz median
    }
private:
    std::priority_queue<int> low; // the smaller half, max-heap // @viz init
    std::priority_queue<int, std::vector<int>, std::greater<int>> high; // the bigger half, min-heap // @viz init
};

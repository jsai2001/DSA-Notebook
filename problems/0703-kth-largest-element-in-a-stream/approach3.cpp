#include <functional>
#include <queue>
#include <vector>
class KthLargest {
public:
    KthLargest(int k, std::vector<int>& nums) : k(k) {
        for (int x : nums) add(x); // @viz init
    }
    int add(int val) {
        heap.push(val); // @viz add
        if ((int)heap.size() > k) heap.pop(); // one too many: the smallest can't be in the top k // @viz pop
        return heap.top(); // @viz answer
    }
private:
    int k;
    std::priority_queue<int, std::vector<int>, std::greater<int>> heap; // min-heap of the k biggest values; its top is the k-th biggest
};

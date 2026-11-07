#include <functional>
#include <queue>
#include <unordered_map>
#include <vector>
class Solution {
public:
    bool isNStraightHand(std::vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize) return false; // the cards must split evenly // @viz init
        std::unordered_map<long long, int> count; // card -> copies left // @viz init
        for (int x : hand) ++count[x]; // @viz init
        std::priority_queue<long long, std::vector<long long>, std::greater<long long>> heap; // the smallest card left on top // @viz init
        for (auto& [x, c] : count) heap.push(x); // @viz init
        while (!heap.empty()) { // @viz group
            long long start = heap.top(); // the smallest card left must start a group // @viz group
            for (long long x = start; x < start + groupSize; ++x) { // @viz take
                auto it = count.find(x); // @viz fail
                if (it == count.end() || it->second == 0) return false; // a missing card breaks the run // @viz fail
                if (--it->second == 0) { // x is used up // @viz take, pop
                    if (x != heap.top()) return false; // a smaller card is still left, and now it can never be in a group // @viz fail
                    heap.pop(); // @viz pop
                }
            }
        }
        return true; // @viz return
    }
};

#include <algorithm>
#include <functional>
#include <utility>
#include <vector>
class Solution {
public:
    int carFleet(int target, std::vector<int>& position, std::vector<int>& speed) {
        int n = position.size(); // @viz init
        std::vector<std::pair<int, int>> cars(n); // @viz init
        for (int i = 0; i < n; ++i) cars[i] = {position[i], speed[i]}; // @viz init
        std::sort(cars.begin(), cars.end(), std::greater<>()); // closest to the target first // @viz init
        int fleets = 0; // @viz init
        double slowest = 0; // arrival time of the fleet just ahead // @viz init
        for (auto& [p, s] : cars) { // @viz car
            double t = (double)(target - p) / s; // @viz car
            if (t > slowest) { // it can't catch the fleet ahead: a new fleet // @viz lead
                ++fleets; // @viz lead
                slowest = t; // @viz lead
            }
        }
        return fleets; // @viz return
    }
};

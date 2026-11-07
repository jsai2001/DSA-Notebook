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
        std::vector<double> stack; // arrival time of each fleet's front car // @viz init
        for (auto& [p, s] : cars) { // @viz push
            stack.push_back((double)(target - p) / s); // @viz push
            if (stack.size() >= 2 && stack.back() <= stack[stack.size() - 2]) // it would arrive no later than the fleet ahead: it joins // @viz merge
                stack.pop_back(); // @viz merge
        }
        return stack.size(); // @viz return
    }
};

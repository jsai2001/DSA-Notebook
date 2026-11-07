#include <algorithm>
#include <vector>
class Solution {
public:
    std::vector<std::vector<int>> kClosest(std::vector<std::vector<int>>& points, int k) {
        auto order = points;
        std::nth_element(order.begin(), order.begin() + (k - 1), order.end(), [](const auto& a, const auto& b) {
            return a[0] * a[0] + a[1] * a[1] < b[0] * b[0] + b[1] * b[1];
        }); // quickselect: the k closest end up first, in any order
        order.resize(k);
        return order;
    }
};

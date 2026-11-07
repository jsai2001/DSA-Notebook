#include <algorithm>
#include <functional>
#include <string>
#include <unordered_map>
#include <vector>
class Solution {
public:
    std::vector<std::string> findItinerary(std::vector<std::vector<std::string>>& tickets) {
        std::sort(tickets.begin(), tickets.end(), std::greater<>()); // biggest first so pop_back gives the smallest // @viz init
        std::unordered_map<std::string, std::vector<std::string>> out; // airport -> its destinations // @viz init
        for (auto& t : tickets) out[t[0]].push_back(t[1]); // @viz init
        std::vector<std::string> stack{"JFK"}, route; // the stack is the current path // @viz init
        while (!stack.empty()) { // @viz visit
            auto& dest = out[stack.back()]; // @viz visit
            if (!dest.empty()) { // a ticket is left: fly it // @viz visit
                std::string b = dest.back(); // @viz visit
                dest.pop_back(); // @viz visit
                stack.push_back(b); // @viz visit
            } else { // stuck: this airport is final from here on // @viz stuck
                route.push_back(stack.back()); // @viz stuck
                stack.pop_back(); // @viz stuck
            }
        }
        std::reverse(route.begin(), route.end()); // @viz return
        return route; // @viz return
    }
};

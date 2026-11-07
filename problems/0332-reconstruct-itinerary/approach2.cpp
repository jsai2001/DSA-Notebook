#include <algorithm>
#include <functional>
#include <map>
#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> findItinerary(std::vector<std::vector<std::string>>& tickets) {
        std::sort(tickets.begin(), tickets.end(), std::greater<>()); // biggest first so pop_back gives the smallest // @viz init
        for (auto& t : tickets) out[t[0]].push_back(t[1]); // airport -> its destinations // @viz init
        visit("JFK"); // @viz return
        std::reverse(route.begin(), route.end()); // filled backwards // @viz return
        return route; // @viz return
    }
private:
    std::map<std::string, std::vector<std::string>> out;
    std::vector<std::string> route;
    void visit(const std::string& a) { // Hierholzer: use up every ticket out of a, then add a // @viz visit
        auto& dest = out[a]; // @viz visit
        while (!dest.empty()) { // @viz visit
            std::string b = dest.back(); // always fly the smallest destination first // @viz visit
            dest.pop_back(); // @viz visit
            visit(b); // @viz visit
        }
        route.push_back(a); // stuck here: this airport comes after everything visited from it // @viz stuck
    }
};

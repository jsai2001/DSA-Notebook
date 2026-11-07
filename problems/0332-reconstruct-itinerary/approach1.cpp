#include <algorithm>
#include <map>
#include <string>
#include <vector>
class Solution {
public:
    std::vector<std::string> findItinerary(std::vector<std::vector<std::string>>& tickets) {
        std::sort(tickets.begin(), tickets.end()); // @viz init
        for (auto& t : tickets) out[t[0]].push_back(t[1]); // airport -> its destinations, smallest first // @viz init
        for (auto& [a, v] : out) used[a].assign(v.size(), false); // @viz init
        total = tickets.size(); // @viz init
        route = {"JFK"}; // @viz init
        go(); // @viz return
        return route; // @viz return
    }
private:
    std::map<std::string, std::vector<std::string>> out;
    std::map<std::string, std::vector<bool>> used;
    std::vector<std::string> route;
    size_t total = 0;
    bool go() { // try to use every remaining ticket from route.back() // @viz try
        if (route.size() == total + 1) return true; // all tickets used // @viz done
        std::string a = route.back(); // @viz try
        auto it = out.find(a); // @viz try
        if (it == out.end()) return false; // @viz try
        auto& dest = it->second; // @viz try
        for (size_t i = 0; i < dest.size(); ++i) { // smallest destination first // @viz try
            if (used[a][i] || (i > 0 && dest[i] == dest[i - 1] && !used[a][i - 1])) continue; // skip a repeat of a ticket just tried // @viz try
            used[a][i] = true; // @viz take
            route.push_back(dest[i]); // @viz take
            if (go()) return true; // the first full route found is the smallest one // @viz take
            route.pop_back(); // dead end: undo and try the next ticket // @viz undo
            used[a][i] = false; // @viz undo
        }
        return false; // @viz undo
    }
};

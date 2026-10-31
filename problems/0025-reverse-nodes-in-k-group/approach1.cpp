/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include <algorithm>
#include <vector>
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        std::vector<ListNode*> nodes; // @viz collect
        for (ListNode* node = head; node; node = node->next) nodes.push_back(node); // @viz collect
        for (size_t start = 0; start + k <= nodes.size(); start += k) // every full group; a shorter tail is skipped // @viz group
            std::reverse(nodes.begin() + start, nodes.begin() + start + k); // reverse the group's order in the array // @viz reverse
        for (size_t i = 0; i + 1 < nodes.size(); ++i) nodes[i]->next = nodes[i + 1]; // relink the same nodes in the new order // @viz link
        nodes.back()->next = nullptr; // @viz return
        return nodes.front(); // @viz return
    }
};

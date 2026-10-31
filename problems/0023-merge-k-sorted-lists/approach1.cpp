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
    ListNode* mergeKLists(std::vector<ListNode*>& lists) {
        std::vector<ListNode*> nodes; // @viz collect
        for (ListNode* head : lists) // @viz collect
            for (ListNode* node = head; node; node = node->next) nodes.push_back(node); // @viz collect
        std::stable_sort(nodes.begin(), nodes.end(), [](ListNode* a, ListNode* b) { return a->val < b->val; }); // @viz sort
        for (size_t k = 0; k + 1 < nodes.size(); ++k) nodes[k]->next = nodes[k + 1]; // relink the same nodes in sorted order // @viz link
        if (nodes.empty()) return nullptr; // no lists, or only empty ones // @viz return
        nodes.back()->next = nullptr; // @viz return
        return nodes.front(); // @viz return
    }
};

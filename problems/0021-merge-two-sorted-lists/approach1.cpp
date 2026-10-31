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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        std::vector<ListNode*> nodes; // @viz collect
        for (ListNode* head : {list1, list2}) // @viz collect
            for (ListNode* node = head; node; node = node->next) nodes.push_back(node); // @viz collect
        // stable: on a tie, list1's node stays first
        std::stable_sort(nodes.begin(), nodes.end(), [](ListNode* a, ListNode* b) { return a->val < b->val; }); // @viz sort
        for (size_t k = 0; k + 1 < nodes.size(); ++k) nodes[k]->next = nodes[k + 1]; // relink the same nodes in sorted order // @viz link
        if (nodes.empty()) return nullptr; // both lists were empty // @viz return
        nodes.back()->next = nullptr; // @viz return
        return nodes.front(); // @viz return
    }
};

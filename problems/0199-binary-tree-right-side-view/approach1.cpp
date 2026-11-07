/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <vector>
class Solution {
public:
    std::vector<int> rightSideView(TreeNode* root) {
        std::vector<std::vector<int>> levels; // every level, left to right // @viz init
        std::vector<TreeNode*> level; // @viz init
        if (root) level.push_back(root); // @viz init
        while (!level.empty()) { // @viz level
            std::vector<int> vals; // @viz level
            std::vector<TreeNode*> next; // @viz next
            for (TreeNode* node : level) { // @viz level
                vals.push_back(node->val); // @viz level
                if (node->left) next.push_back(node->left); // the next level, left to right // @viz next
                if (node->right) next.push_back(node->right); // @viz next
            }
            levels.push_back(vals); // @viz level
            level = next; // @viz next
        }
        std::vector<int> res; // @viz return
        for (auto& vals : levels) res.push_back(vals.back()); // the rightmost value of each level // @viz return
        return res; // @viz return
    }
};
